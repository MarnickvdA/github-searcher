import { PropsWithChildren } from "react";

export const Card = (props: PropsWithChildren & { className?: string }) => (
  <div className={`bg-slate-50 shadow-2xl rounded-lg p-8 ${props.className}`}>
    {props.children}
  </div>
);
