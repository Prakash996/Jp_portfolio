import "../css/Loading.css";

export default function Loading({ isLoading, children, className = "" }) {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={`relative w-full ${className}`} aria-busy="true" aria-live="polite">
            {children}
        </div>
    );
}
