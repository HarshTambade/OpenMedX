# 🔧 OpenMedX Setup Instructions

## 📋 Prerequisites

- Node.js 18+ or Bun
- Git
- Hugging Face account (free)

---

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/UnknownDeveloper2k24/OpenMedX.git
cd OpenMedX
```

### 2. Install Dependencies

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Hugging Face API key:

```env
HUGGINGFACE_API_KEY=your_actual_api_key_here
```

**How to get a Hugging Face API key:**
1. Go to https://huggingface.co/
2. Sign up for a free account (if you don't have one)
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token and paste it in `.env.local`

### 4. Run the Development Server

```bash
# Using bun
bun run dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

### 5. Open in Browser

Navigate to: http://localhost:3000

---

## 🎯 Testing the Application

### Option 1: Quick Test (Recommended)
Visit: http://localhost:3000/test-setup.html
- Automatically creates a test user
- Redirects to dashboard
- Start chatting immediately

### Option 2: Full Registration
1. Click "Get Started" on homepage
2. Complete 3-step registration
3. Access dashboard

---

## 🏗️ Project Structure

```
OpenMedX/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Landing page
│   ├── register/            # Registration flow
│   ├── login/               # Login page
│   ├── dashboard/           # Main dashboard
│   └── api/                 # API routes
│       └── chat/            # AI chat endpoint
├── components/              # React components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utility functions
│   ├── utils.ts            # Helper functions
│   └── medicalKnowledge.ts # Medical knowledge base
├── public/                  # Static files
├── .env.local              # Environment variables (create this)
├── .env.example            # Environment template
└── README.md               # Documentation
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `HUGGINGFACE_API_KEY` | Your Hugging Face API token | Yes |

---

## 🐛 Troubleshooting

### Issue: "API key not found" error

**Solution:** Make sure you've created `.env.local` and added your Hugging Face API key.

### Issue: AI responses not working

**Solutions:**
1. Check that your Hugging Face API key is valid
2. Verify you have internet connection
3. Check browser console for errors
4. The app has a fallback system - you'll still get evidence-based responses

### Issue: Port 3000 already in use

**Solution:** Use a different port:
```bash
PORT=3001 bun run dev
```

### Issue: Dependencies not installing

**Solution:** Clear cache and reinstall:
```bash
rm -rf node_modules
rm -rf .next
bun install
```

---

## 📦 Building for Production

```bash
# Build the application
bun run build

# Start production server
bun run start
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variable: `HUGGINGFACE_API_KEY`
5. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud Run

**Important:** Always add your `HUGGINGFACE_API_KEY` as an environment variable in your deployment platform.

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Keep your API keys secret** - Don't share them publicly
3. **Use environment variables** - Never hardcode API keys in code
4. **Rotate keys regularly** - Generate new API keys periodically

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Hugging Face Documentation](https://huggingface.co/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💡 Development Tips

### Hot Reload
The development server supports hot reload - changes will automatically reflect in the browser.

### TypeScript
The project uses TypeScript for type safety. Check types with:
```bash
bun run type-check
```

### Linting
Format code with:
```bash
bun run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

**Issues?** Open an issue on GitHub
**Questions?** Contact: muthonibrayan257@gmail.com

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**

*OpenMedX - Where AI meets Medicine — Ethically, Openly, Intelligently.*
