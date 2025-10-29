import type { useLocation, useNavigate } from "react-router";

export type AppNavigate = ReturnType<typeof useNavigate>;
export type AppLocation = ReturnType<typeof useLocation>;
