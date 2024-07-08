import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

interface Props {
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
  type?: string;
  fullWidth?: boolean;
  className?: string;
  variant?: "standard" | "outlined" | "filled";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  InputProps?: any;
}

const CustomTextFieldStyled = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#393939",
    },
    "&:hover fieldset": {
      borderColor: "#393939",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
}));

export const CustomTextField = ({
  placeholder,
  rows,
  multiline,
  fullWidth,
  value,
  type,
  className,
  InputProps,
  variant,
  onKeyDown,
  onChange,
  ...props
}: Props) => {
  return (
    <CustomTextFieldStyled
      variant={variant}
      InputProps={InputProps}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      onKeyDown={onKeyDown}
      rows={rows}
      multiline={multiline}
      fullWidth={fullWidth}
      className={className}
      {...props}
    />
  );
};
