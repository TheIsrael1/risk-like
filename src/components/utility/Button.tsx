import React from "react";

interface ButtonInterface {
  onClick: () => void;
  name: string;
  img?: string;
  type: "success" | "danger";
  size?: "big" | "small";
}
const Button = ({
  name,
  onClick,
  img,
  type,
  size = "small",
}: ButtonInterface) => {
  return (
    <div
      className={`special_button${
        type === "success" ? `__success` : `__danger`
      } ${size === `small` ? `special_button__small` : `special_button__big`}`}
      onClick={() => onClick()}
    >
      {img ? (
        <img loading="lazy" src={img} className="img" alt="store" />
      ) : (
        <></>
      )}
      <span className="span">{name}</span>
    </div>
  );
};

export default Button;
