import PropTypes from 'prop-types';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    type = 'button',
    ...props
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-400',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    type: PropTypes.string,
};

export default Button;
