"use client";
import { ThemeToggle } from "@/components/ThemeToggle/themeToggle";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useCurrentUserQuery } from "@/features/RTK/Query/GetCurrentUser/GetCurretnUserSlice";
import { useLogoutMutation } from "@/features/RTK/Query/GetCurrentUser/logout/logoutAPI";
import { useState } from "react";
import Stack from "@mui/material/Stack";

export function Nav() {
    const { data: currentUser, isLoading, isFetching } = useCurrentUserQuery();
    const [logout] = useLogoutMutation();
    const [open, setOpen] = useState(false);

    if (isLoading || isFetching) return null;

    const user = currentUser?.data??null;

    const logoutUser = async () => {
        await logout().unwrap();
    };

    return (
        <>
            <AppBar
                component="nav"
                position="static"
                color="transparent"
                elevation={0}
                className="w-full max-w-[90%] mx-auto pt-4 z-50"
            >
                <Toolbar className="flex justify-between items-center w-full">

                    {user?.isTokenAvailable && (
                        <Link href="/" className="font-semibold">
                            Main Menu
                        </Link>
                    )}

                    <Box className="hidden md:flex items-center gap-8">
                        <ThemeToggle />
                        {user?.isAdmin && <AdminNavContent />}
                        {user?.isTokenAvailable && renderDefaultNav(false,logoutUser)}
                    </Box>

                    <IconButton
                        edge="end"
                        sx={{ mr: 2, display: { xs:"block",sm: 'none'  } }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box
                    className="flex flex-col gap-6 p-6 min-w-[250px]"
                    role="presentation"
                >
                    <ThemeToggle />
                    {user?.isAdmin && <AdminNavContent />}
                    {user?.isTokenAvailable && renderDefaultNav(open,() => {
                        logoutUser();
                        setOpen(false);
                    })}
                </Box>
            </Drawer>
        </>
    );
}

function renderDefaultNav(open:boolean,logoutUser: () => void) {
    const flexDirection = open ? " flex-col " : " flex-row ";
    const alignItems = open?" items-start ": " items-center "
    return (
        <Box className={"flex  gap-2  justify-center" + flexDirection +alignItems}>
            <Link href="/vote" className="underline " >
                Click Here for Vote
            </Link>
            <Divider/>
            <Stack direction="row"  component="section" className="flex  gap-2 justify-center items-center ">
                {open && <Typography component="p" className="underline"> Logout </Typography>}
                <IconButton
                aria-label="Logout"

                href="/signIn"
                onClick={() => logoutUser()}
            >
                <LogoutIcon/>
            </IconButton>
            </Stack>
        </Box>
    );
}

function AdminNavContent() {
    return (
        <Link href="/Admin/Dashboard" className="underline">
            Dashboard
        </Link>
    );
}
