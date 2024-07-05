import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

interface Props {
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
  fullWidth?: boolean;
  className?: string;
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
  className,
  ...props
}: Props) => {
  return (
    <CustomTextFieldStyled
      InputProps={{
        style: {
          color: "white",
        },
      }}
      placeholder={placeholder}
      rows={rows}
      multiline={multiline}
      fullWidth={fullWidth}
      className={className}
      {...props}
    />
  );
};
