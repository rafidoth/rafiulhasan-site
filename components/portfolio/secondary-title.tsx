export function SecondaryTitle({ children }: { children: string }) {
    return <>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground my-2">
            {children}
        </h2>
    </>
}
