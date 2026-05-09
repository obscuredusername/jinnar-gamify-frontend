const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();
const localFile = path.join(__dirname, 'deployment-bundle.tar.gz');
const remoteFile = '/root/jinnar-gamify-frontend-bundle.tar.gz';

console.log('Attempting to connect via SSH...');

conn.on('ready', () => {
  console.log('SSH connection established successfully!');
  
  console.log('Stopping and removing old container (jinnar-frontend)...');
  conn.exec('docker stop jinnar-frontend && docker rm jinnar-frontend', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Old container stopped and removed.');
      
      console.log('Uploading new code bundle...');
      conn.sftp((err, sftp) => {
        if (err) throw err;
        
        sftp.fastPut(localFile, remoteFile, (err) => {
          if (err) throw err;
          console.log('Upload complete!');
          
          console.log('Extracting and building new Docker image...');
          const buildCmd = `
            mkdir -p /root/jinnar-frontend-new && 
            tar -xzf ${remoteFile} -C /root/jinnar-frontend-new && 
            cd /root/jinnar-frontend-new && 
            docker build -t jinnar-viral-app:latest .
          `;
          
          conn.exec(buildCmd, (err, buildStream) => {
            if (err) throw err;
            buildStream.on('data', data => process.stdout.write(data.toString()));
            buildStream.stderr.on('data', data => process.stderr.write(data.toString()));
            buildStream.on('close', (code) => {
              if (code !== 0) {
                 console.log('Build failed!');
                 conn.end();
                 return;
              }
              console.log('Docker image built successfully!');
              
              console.log('Starting new container...');
              const runCmd = 'docker run -d --name jinnar-frontend -p 6190:6190 --restart unless-stopped jinnar-viral-app:latest';
              conn.exec(runCmd, (err, runStream) => {
                if (err) throw err;
                runStream.on('data', data => process.stdout.write(data.toString()));
                runStream.stderr.on('data', data => process.stderr.write(data.toString()));
                runStream.on('close', () => {
                  console.log('New container started successfully! Deployment complete.');
                  conn.end();
                });
              });
            });
          });
        });
      });
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).on('error', (err) => {
    console.error("SSH connection error:", err);
}).connect({
  host: '195.110.58.111',
  port: 22,
  username: 'root',
  password: '7,qB33P/NM43x89Ik?nO'
});
