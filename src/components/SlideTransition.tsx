import { ReactNode } from "react";

interface SlideTransitionProps {
  active: boolean;
  children: ReactNode;
}

const SlideTransition = ({ active, children }: SlideTransitionProps) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
        active ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
};

export default SlideTransition;
