"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface items {
  firstName: string;
  lastName: string;
  refPaid: number;
  _id: string;
}
const Page = () => {
  const router = useParams()
  const { id } = router

  const [items, setItems] = useState<items[]>([])
  const [length, setLength] = useState<number>(0)
  const [totalPaid, setTotalPaid] = useState<number>(0)
  const [totalUnPaid, setTotalUnPaid] = useState<number>(0)


  useEffect(() => {
    const loadCont = async () => {
      const res = await fetch("/api/admin/withdrawn/ref/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uId: id
        })
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        if (data.code === 1) {
          setItems(data.data)
          setLength(data.length)
          setTotalPaid(data.totalPaid)
          setTotalUnPaid(data.totalUnPaid)
        }
      }
    }
    loadCont();
    return () => { }
  }, [id])

  return (
    <div>
      <div>
        <a href="/admin/withdrawn/" ><button>Go Back</button></a>
        <h1>
          | Total: {totalPaid} | Unpaid: {totalUnPaid}
        </h1>
      </div>

      <div >
        <table className='admin_table'>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Full Name</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {length > 0 ? (
              items.map((ele, index) => (
                <tr key={index}>
                  <td>1</td>
                  <td>
                    <Link href={"/page/people/" + ele._id + "/" + ele.firstName + " " + ele.lastName}>{ele.firstName + ' ' + ele.lastName}</Link>
                  </td>
                  {ele.refPaid > 0 ? (
                    <td><i className="fa-solid fa-indian-rupee"></i> {ele.refPaid}</td>
                  ) : (
                    <td>unPaid</td>
                  )}

                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Page