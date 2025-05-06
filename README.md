# **Magic Portfolio by Once UI**

View the [demo here](https://demo.magic-portfolio.com).

![Magic Portfolio](https://demo.magic-portfolio.com/images/og/home.jpg)


# **Getting started**

Magic Portfolio was built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org). It requires Node.js v18.17+.

**1. Clone the repository**
```
git clone https://github.com/once-ui-system/magic-portfolio.git
```

**2. Install dependencies**
```
npm install
```

**3. Run dev server**
```
npm run dev
```

**4. Edit config**
```
src/app/resources/config
```

**5. Edit content**
```
src/app/resources/content
```

**6. Create blog posts / projects**
```
Add a new .mdx file to src/app/blog/posts or src/app/work/projects
```

# **Deploy to VPS (Instructions for when ready)**

**1. Configure GitHub Secrets**
In your GitHub repository, add these secrets (Settings > Secrets and variables > Actions):
```
EMAIL_USER=iacopoliberolavoro@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
SSH_PRIVATE_KEY=your_private_ssh_key
SSH_KNOWN_HOSTS=output_of_ssh-keyscan_your_vps_host
VPS_USER=your_vps_username
VPS_HOST=your_vps_hostname_or_ip
VPS_PATH=/path/to/portfolio/on/vps
```

**2. Set up the GitHub Actions workflow**
```
# Create the workflows directory if it doesn't exist
mkdir -p .github/workflows/

# Copy the workflow example file
cp .github-temp/workflows/portfolio-deploy.yml.example .github/workflows/portfolio-deploy.yml

# Remove the directories from .gitignore
# Edit .gitignore and remove these lines:
# /.github/workflows/
# /.github-temp/
```

**3. Configure the VPS**
```
# SSH into your VPS
ssh your_username@your_vps_hostname

# Install Node.js and npm (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 to manage the Node.js process
sudo npm install -g pm2

# Create the directory for the application
mkdir -p /path/to/portfolio

# Set up proper permissions
sudo chown your_username:your_username /path/to/portfolio
```

**4. Create a production .env file on the VPS**
```
# On your VPS, create a .env file in the application directory
nano /path/to/portfolio/.env

# Add these environment variables
EMAIL_USER=iacopoliberolavoro@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**5. Deploy**
Push to the main branch or manually trigger the workflow from the GitHub Actions tab.

# **Documentation**

Docs available at: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

# **Features**

## **Once UI**
- All tokens, components & features of [Once UI](https://once-ui.com)

## **SEO**
- Automatic open-graph and X image generation with next/og
- Automatic schema and metadata generation based on the content file

## **Design**
- Responsive layout optimized for all screen sizes
- Timeless design without heavy animations and motion
- Endless customization options through [data attributes](https://once-ui.com/docs/theming)

## **Content**
- Render sections conditionally based on the content file
- Enable or disable pages for blog, work, gallery and about / CV
- Generate and display social links automatically
- Set up password protection for URLs

## **Localization**
- A localized version of Magic Portfolio is available with the next-intl library
- To use localization, switch to the 'i18n' branch

# **Authors**

Connect with us on Threads or LinkedIn.

Lorant Toth: [Threads](https://www.threads.net/@lorant.one), [LinkedIn](https://www.linkedin.com/in/tothlorant/)  
Zsofia Komaromi: [Threads](https://www.threads.net/@zsofia_kom), [LinkedIn](https://www.linkedin.com/in/zsofiakomaromi/)

Localization added by [François Hernandez](https://github.com/francoishernandez)

# **Get involved**

- Join the [Design Engineers Club on Discord](https://discord.com/invite/5EyAQ4eNdS) and share your portfolio with us!
- Report a [bug](https://github.com/once-ui-system/magic-portfolio/issues/new?labels=bug&template=bug_report.md).

# **License**

Distributed under the CC BY-NC 4.0 License.
- Commercial usage is not allowed.
- Attribution is required.
- You can extend the license to commercial use by purchasing a [Once UI Pro](https://once-ui.com/pricing) license.

See `LICENSE.txt` for more information.

# **Deploy with Vercel**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fdemo.magic-portfolio.com&demo-image=%2F%2Fraw.githubusercontent.com%2Fonce-ui-system%2Fmagic-portfolio%2Fmain%2Fpublic%2Fimages%2Fog%2Fhome.jpg)