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
        isDarkMode ? "bg-gray-700 ring-gray-700" : "bg-gray-200 ring-gray-300"
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
        isDarkMode ? "bg-gray-950 text-gray-300" : "bg-white text-gray-600"
      } shadow hover:shadow-pink-200 rounded-full transition-transform ${className ?? ""}`}
      {...props}
      ref={ref}
    />
  );
});

Thumb.propTypes = {
  className: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
};
