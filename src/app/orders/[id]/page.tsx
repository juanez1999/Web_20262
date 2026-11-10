type OrderDetailsProps = {
    params: Promise<{ id?: string }>
}

export default async function OrderDetailPage({params}: OrderDetailsProps) {
    const { id } = await params; 

    return (
        <>
        <h1>El id de la orden es { id }</h1>
        </>
    )
    
}