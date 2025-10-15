import Link from 'next/link';

export default function Navigation() {
  return (
    <div
      className="fixed bottom-20 right-5 sm:bottom-2 sm:right-1 w-12 h-12 flex flex-col justify-center items-center cursor-pointer rounded-full
            transition duration-500 ease-in-out transform-gpu hover:scale-150 bg-gray-200 dark:bg-gray-800 z-50"
    >
      <Link href="/" passHref>
        <svg
          className="h-4 w-4 fill-current text-gray-800 dark:text-gray-200"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M917.05 1024a27.494 27.494 0 0 1-27.494-27.494V412.404a72.996 72.996 0 0 0-25.294-54.987L526.09 64.473a40.14 40.14 0 0 0-51.962.824L157.95 357.417a73.408 73.408 0 0 0-23.507 53.888V947.43a23.92 23.92 0 0 0 23.507 21.308h584.102a27.494 27.494 0 0 1 0 54.987h-583.69a78.907 78.907 0 0 1-77.944-68.734 59.661 59.661 0 0 1-.962-10.035V411.305a127.845 127.845 0 0 1 41.24-94.029L436.874 24.882A94.028 94.028 0 0 1 561.97 22.82l338.309 293.357a128.395 128.395 0 0 1 44.264 96.227v584.102A27.494 27.494 0 0 1 917.05 1024z" />
          <path d="M399.895 512.0690000000001v-.138q0-44.814 44.814-44.814h134.72q44.814 0 44.814 44.814v.138q0 44.814-44.815 44.814H444.71q-44.814 0-44.814-44.814z" />
        </svg>
      </Link>
    </div>
  );
}
