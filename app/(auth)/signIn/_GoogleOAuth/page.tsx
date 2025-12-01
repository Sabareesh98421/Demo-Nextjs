"use client";

import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function GoogleLoginButton() {
    const handleClick = () => {
        window.location.href = "/auth/google";
    };

    return (
        <Button
            onClick={handleClick}
            variant="outlined"
            sx={{
                textTransform: "none",
                borderRadius: 2,
                padding: "8px 16px",
                borderColor: "#dadce0",
                color: "#3c4043",
                backgroundColor: "#fff",
                "&:hover": {
                    backgroundColor: "#f7f8f8",
                    borderColor: "#c5c7c9"
                }
            }}
        >
            <Stack direction="row" alignItems="center" gap={1}>
                <Image
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                />
                <Typography sx={{ fontWeight: 500 }}>Sign in with Google</Typography>
            </Stack>
        </Button>
    );
}
