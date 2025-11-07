# Temporary Email Service

A clean, minimalist, single-page website that automatically generates free, anonymous temporary email addresses for users.

## Features

- 🎯 **Instant Temporary Email**: Automatically generates working temporary email addresses
- ⏰ **10-Minute Validity**: Email addresses valid for 10 minutes with countdown timer
- 📧 **Real-time Inbox**: Messages appear automatically in real-time
- 🔄 **Extend Timer**: Option to extend time by 5 minutes
- 📋 **Copy & Forward**: Easy email address and message copying
- 🎨 **Modern Design**: Black, orange, and white color scheme
- 📱 **Responsive**: Works perfectly on mobile and desktop
- 🔒 **Privacy First**: No registration, no personal data stored

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Backend**: Next.js API routes with mail.tm integration
- **Colors**: Custom black, orange, white theme
- **Icons**: Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/temp-email-service.git
cd temp-email-service

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database setup (if using Prisma)
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
# Optional: Add any custom configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

The app is designed to work with any platform that supports Next.js:

- **Vercel**: Zero configuration deployment
- **Netlify**: With Next.js adapter
- **Railway**: Docker deployment
- **DigitalOcean**: App Platform

## Project Structure

```
src/
├── app/
│   ├── api/temp-email/     # Backend API routes
│   ├── policy/             # Policy & legal page
│   ├── globals.css         # Global styles with orange theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main temporary email service
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── TempEmailService.tsx # Main service component
└── lib/
    ├── socket.ts            # Socket.IO configuration
    └── utils.ts             # Utility functions
```

## API Integration

Uses [mail.tm](https://mail.tm) API for temporary email functionality:

- **Account Creation**: `/api/temp-email/create`
- **Message Retrieval**: `/api/temp-email/messages`
- **Message Details**: `/api/temp-email/message/[id]`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Privacy & Legal

- 📋 [Privacy Policy](/policy) - Complete privacy documentation
- 📜 [Terms of Service](/policy) - Usage terms and conditions
- ⚖️ [Legal Disclaimer](/policy) - Legal information and disclaimers

---

**Built with ❤️ using Next.js 15 and modern web technologies**