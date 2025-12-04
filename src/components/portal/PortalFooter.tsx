import Link from "next/link";


export const PortalFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Goodeez Portal. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Powered by <Link href="/">Goodeez</Link>
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Support</a>
        </div>
      </div>
    </footer>
  );
};
