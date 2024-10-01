import { forwardRef } from "react";
import * as Switch from "@radix-ui/react-switch";
import PropTypes from "prop-types";

export const Root = forwardRef(function Root(
  { isDarkMode, className, ...props },
  ref
) {
  return (
    <Switch.Root
      className={`w-[30px] h-[30px] rounded-full ${
        isDarkMode ? "bg-transparent" : "bg-transparent"
      } transition-colors ${className ?? ""}`}
      {...props}
      ref={ref}
    />
  );
});

Root.propTypes = {
  className: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
};

export const Thumb = forwardRef(function Thumb(
  { isDarkMode, className, ...props },
  ref
) {
  return (
    <Switch.Thumb
      className={`flex items-center justify-center w-[30px] h-[30px] ${
        isDarkMode ? "bg-neutral-950 text-neutral-50 shadow-neutral-800" : "bg-neutral-50 text-neutral-950 shadow-neutral-500"
      } shadow rounded-full transition-transform ${className ?? ""}`}
      {...props}
      ref={ref}
    />
  );
});

Thumb.propTypes = {
  className: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
};
