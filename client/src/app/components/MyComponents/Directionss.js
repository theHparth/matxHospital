import { Breadcrumb, SimpleCard } from 'app/components'

const Directionss = ({ description, pathName, type }) => {
    return (
        <div className="breadcrumb">
            <Breadcrumb
                routeSegments={[
                    {
                        name: { description },
                        path: { pathName },
                    },
                    { name: { type } },
                ]}
            />
        </div>
    )
}

export { Directionss }
