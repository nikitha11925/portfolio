/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint is run separately in CI; don't fail production builds on lint warnings.
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    // The project lives on a mapped/virtual drive (Z:) where readlink() on a
    // regular file returns EISDIR instead of EINVAL, which breaks webpack's
    // symlink resolution. Disabling symlink resolution sidesteps it and is a
    // no-op on normal filesystems / Vercel.
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
