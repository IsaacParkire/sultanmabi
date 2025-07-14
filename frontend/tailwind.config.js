// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Premium color palette with your brand colors
      colors: {
        // Core brand colors
        'madder': '#A31621',
        'madder-dark': '#8a1220',
        'snow': '#FCF7F8',
        'dark-blue': '#102542',
        'text-dark': '#331f05',
        
        // Additional colors for UI elements
        'accent': '#D4AF37', // Gold
        'accent-dark': '#B5942E',
        'success': '#4CAF50',
        'error': '#F44336',
        'warning': '#FFC107',
        'info': '#2196F3',
      },
      
      // Premium typography with Surveyor Display and Gotham Condensed
      fontFamily: {
        heading: [
          'Surveyor Display', 
          'Playfair Display', 
          'serif'
        ],
        body: [
          'Gotham Condensed Book', 
          'Montserrat', 
          'sans-serif'
        ],
        sans: [
          'Gotham Condensed Book', 
          'Montserrat', 
          'system-ui', 
          'sans-serif'
        ],
        serif: [
          'Surveyor Display', 
          'Playfair Display', 
          'serif'
        ],
        accent: [
          'Surveyor Display', 
          'Playfair Display', 
          'serif'
        ],
      },
      
      // Extended spacing/sizing
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '60': '15rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      
      // Premium shadows for depth
      boxShadow: {
        'artcaffe-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'artcaffe-md': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'artcaffe-lg': '0 8px 24px rgba(0, 0, 0, 0.16)',
        'artcaffe-xl': '0 12px 32px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 15px rgba(163, 22, 33, 0.3)',
        'button-hover': '0 6px 20px rgba(163, 22, 33, 0.4)',
        'inner-artcaffe': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      
      // Border radius for ArtCaffe styling
      borderRadius: {
        'artcaffe-sm': '8px',
        'artcaffe-md': '12px',
        'artcaffe-lg': '16px',
        'artcaffe-xl': '24px',
        'artcaffe-full': '9999px',
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.85' },
        }
      },
      
      // Custom gradients
      backgroundImage: {
        'madder-gradient': 'linear-gradient(45deg, #A31621, #8a1220)',
        'dark-gradient': 'linear-gradient(45deg, #102542, #0a1a2e)',
        'accent-gradient': 'linear-gradient(45deg, #D4AF37, #B5942E)',
        'slogan-gradient': 'linear-gradient(45deg, #A31621, #D4AF37, #A31621)',
      },
      
      // Letter spacing for typography
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.015em',
        'wide': '0.02em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    
    // Custom plugin for ArtCaffe components
    function({ addComponents }) {
      addComponents({
        '.artcaffe-card': {
          '@apply rounded-artcaffe-lg shadow-artcaffe-lg bg-snow overflow-hidden': {},
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            '@apply shadow-artcaffe-xl': {},
            transform: 'translateY(-10px)',
          }
        },
        '.artcaffe-btn': {
          '@apply bg-madder text-snow px-6 py-3 rounded-artcaffe-full font-body font-medium transition-all duration-300': {},
          boxShadow: '0 4px 15px rgba(163, 22, 33, 0.3)',
          letterSpacing: '0.5px',
          '&:hover': {
            backgroundColor: '#8a1220',
            boxShadow: '0 6px 20px rgba(163, 22, 33, 0.4)',
            transform: 'scale(1.05)',
          }
        },
        '.slogan-text': {
          '@apply font-accent font-light tracking-tighter': {},
          backgroundImage: 'linear-gradient(45deg, #A31621, #D4AF37, #A31621)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 6s ease infinite',
        },
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      })
    }
  ],
}