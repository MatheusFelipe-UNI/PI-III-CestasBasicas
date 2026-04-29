import ModalProvider from "../../Context/ModalContext";

export default function MainLayout({title, customStyle = null, children}) {
    return(
        <ModalProvider>
            <section className={customStyle ? customStyle : ""}>
                <h1 className="mainTitle">{title}</h1>
                {children}
            </section>
        </ModalProvider>
    )
}