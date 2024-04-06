# _**Next.js Project**_ - First Practice Project

Welcome to my Next.js project repository! This repository contains the codebase for an example project built with Next.js bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Throughout the development process, I explored various features of Next.js, leveraging its capabilities to create modern and efficient web applications.

## _Features:_

- **Server-side Rendering (SSR):** Utilized Next.js SSR capabilities to render pages on the server, improving performance and SEO.
- **Static Site Generation (SSG):** Leveraged Next.js SSG to generate static HTML pages at build time, enabling fast loading and caching.
- **API Routes:** Implemented API routes to handle server-side logic and data fetching, keeping the codebase clean and organized.
- **Dynamic Routing:** Utilized Next.js dynamic routing to create dynamic and personalized user experiences.
- **Styling:** Styled components using CSS modules and Tailwind CSS to create beautiful and responsive UI designs.
- **Optimized Performance:** Ensured optimal performance with Next.js optimizations such as code splitting, image optimization, and lazy loading.

## Technologies Used:

- Next.js 12.0
- React 18.0
- Tailwind CSS
- CSS Modules

## How to Run:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
5. Open your browser and visit `http://localhost:3000`.

### Using Docker Image:

1. Create a Docker file (in the project root) with:

```
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js

```

2. Run the following command to create the Docker image:
   `docker build -t "DOCKER IMAGE NAME YOU WANT" .`
3. Run the following command to run the container:
   `docker container run -p 3000:3000 "DOCKER IMAGE NAME YOU WANT"`

## Explore the project deployed on _Vercel_

[First Practice Project](https://pablot-next-first-steps.vercel.app/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
