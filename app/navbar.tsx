import Link from "next/link"

export default function Navbar(){
    return(
        <div className="bg-purple-500 py-4 px-6 gap-6 flex text-lg text-white">
            <Link href="/">Home</Link>
            <Link href="/RatingPage">Rating Page</Link>
            <Link href="/AddDocs">Add Documents</Link>
            <Link href="/DeleteDocs">Delete Documents</Link>
        </div>
    )
}