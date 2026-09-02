export function Pagination({ paginas, paginaActual }) {
    return (
        <nav className="pagination">
            <a href="#">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </a>
            {Array(paginas).fill().map((_, index) => (
                <a 
                    key={index + 1}
                    data-page={index + 1} 
                    href="#" 
                    className={index + 1 === paginaActual ? "active" : undefined}
                >
                    {index + 1}
                </a>
            ))}
            <a href="#">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </a>
        </nav>
    )
}