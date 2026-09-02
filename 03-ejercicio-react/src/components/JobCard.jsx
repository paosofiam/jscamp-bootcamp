export function JobCard({ job }) {
    return (
        <article
            className="job-listing-card"
            data-id={job.id}
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-technology={job.data.technology}
        >
            <div>
                <h3>{job.titulo}</h3>
                <small>{job.empresa} | {job.data.modalidad}</small>
                <p>{job.descripcion}</p>
            </div>
            <button className="button-apply-job">Aplicar</button>
        </article>
    )
}