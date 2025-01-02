import { useQuery } from "@tanstack/react-query";
import ListingDetailContent from "./ListingDetailContent";
import djungelksogImg from "@/assets/images/djungelskog.png";
import queries from "@/logic/queries";
import { useSearch } from "@tanstack/react-router";

const ListingPage = () => {
    const search = useSearch({
        strict: false,
    });

    const { data: listing } = useQuery(queries.listings.listing(search?.postId!));
    const { data: seller } = useQuery({
        ...queries.users.user(listing?.user ?? ""),
        enabled: listing?.user !== null && listing?.user !== undefined
    });

    if (!listing || !seller) return (
        <h1 className="text-2xl">listing not found ;-;</h1>
    );

    return <ListingDetailContent
        imageSrc={djungelksogImg}
        name={listing.title}
        price={listing.price}
        description={listing.description}
        sellerName={seller.name}
        podName={listing.pod}
    />;
}

export default ListingPage;