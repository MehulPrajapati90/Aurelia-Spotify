"use client";

import React, { useEffect } from "react";
import { useOnboardUser } from "@/modules/auth/hooks/user";

const Home = () => {
    const { mutateAsync, data, error, isPending } = useOnboardUser();

    useEffect(() => {
        mutateAsync();
    }, [mutateAsync]);

    return (
        <div>

        </div>
    );
};

export default Home;
