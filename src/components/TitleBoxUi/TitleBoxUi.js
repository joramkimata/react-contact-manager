import { Paper, Typography } from "@mui/material";

const TitleBoxUi = ({ title, para = false, children, icon = <List /> }) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 1,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {icon}
            {para ? (
              <Typography>{title}</Typography>
            ) : (
              <Typography variant="h6" component="h6">
                {title}
              </Typography>
            )}
          </div>
          {children}
        </span>
      </Paper>
    </>
  );
};

export default TitleBoxUi;
