"use client"
import LoginBlockDiv from '@/app/components/temp/LoginBlockDiv'
import React, { useEffect, useState } from 'react'
import BlogAppContent from '../../blogs/BlogAppContent'
import { useParams } from 'next/navigation'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList'
import SecondHandPublicPost from '../../secondhand/SecondHandPublicPost'
interface Contents {
    item: {
        _id: string;
        contact1: number;
        contact2: number;
        createdDate: number;
        images: Array<string>;
        productCategory: string;
        productDes: string;
        productName: string;
        productOld: string;
        productPin: number;
        productPrice: number;
        userId: string;
    };
    user: {
        firstName: string;
        profilePic: string;
    };
}
const SecondHandSingleView = () => {
    const router = useParams()
    const { id } = router

    const [contents, setContents] = useState<Contents[]>([]);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);

    useEffect(() => {
        const loadNews = async () => {
            await fetch(`/api/products/second-hand/public/single/${id}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 1) {

                        console.log(data.data)

                        setContents((prevData) => [...prevData, ...data.data]);

                        if (data.data.length > 0) {

                            //Create Image Circular linked list array
                            const arr = data.data;

                            const doublyLinkedLists: DoublyCircularLinkedList[] = [];
                            arr.forEach((ele: Contents) => {
                                const doublyLL = new DoublyCircularLinkedList();
                                ele.item.images.forEach((item) => {
                                    doublyLL.append(item);
                                });
                                doublyLinkedLists.push(doublyLL);
                            });
                            setDoublyLinkedLists(prevData => [...prevData, ...doublyLinkedLists])

                        }
                    }
                })
        }
        loadNews();
        // Remove the event listener when the component unmounts
        return () => {};
    }, [id]);

  return (
    <>
          <LoginBlockDiv></LoginBlockDiv>

          <BlogAppContent
              mainContent={
                  <div className="main_content">

                      <div className="title_bar">
                          <div>
                              <div>
                                  <h3>
                                      <i className="fa-solid fa-circle-info icon-list"></i> SecondHand
                                  </h3>
                              </div>
                          </div>
                          <div>
                              <div></div>
                          </div>
                      </div>

                      <div className="columns_two_product">
                          {contents.map((ele, index) => (

                              <SecondHandPublicPost
                                  key={index}
                                  index={index}
                                  images={ele.item.images}
                                  doublyLinkedLists={doublyLinkedLists}
                                  profilePic={ele.user.profilePic}
                                  firstName={ele.user.firstName}
                                  productPin={ele.item.productPin}
                                  productName={ele.item.productName}
                                  productPrice={ele.item.productPrice}
                                  productOld={ele.item.productOld}
                                  productDes={ele.item.productDes}
                                  contact1={ele.item.contact1}
                                  contact2={ele.item.contact2}
                                  id={ele.item._id}
                              />


                          ))}

                      </div>

                  </div>
              }
          ></BlogAppContent>
    </>
  )
}

export default SecondHandSingleView