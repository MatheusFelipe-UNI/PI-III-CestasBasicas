
export default function MainLayout({title, customStyle = null, children}) {
    return(
        <section className={customStyle ? customStyle : ""}>
            <h1 className="mainTitle">{title}</h1>
            {children}
        </section>
    )
}