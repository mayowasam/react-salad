import React from "react"
import withProviders from "../../scripts/withproviders"

function Invoice() {


    return (
        <section className="bg-[#101828] text-white max-w-full min-h-screen flex items-center justify-center py-4">

            <h4 className="text-red-900  text-8xl font-extrabold"> Invoice</h4>
        </section>
    )
}

export default withProviders(Invoice)
