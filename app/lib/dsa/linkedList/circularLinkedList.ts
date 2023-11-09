// // Structure for a node
// class Node {
//     constructor(data, imageUrl) {
//         this.data = data;
//         this.imageUrl = imageUrl;
//         this.next = null;
//     }
// }

// // Circular Linked List for the slideshow
// class Slideshow {
//     constructor() {
//         this.head = null;
//         this.current = null;
//     }

//     // Function to insert a node at the end of the circular linked list
//     insert(data, imageUrl) {
//         const newNode = new Node(data, imageUrl);

//         if (!this.head) {
//             this.head = newNode;
//             newNode.next = this.head;
//             this.current = this.head;
//         } else {
//             let temp = this.head;
//             while (temp.next !== this.head) {
//                 temp = temp.next;
//             }
//             temp.next = newNode;
//             newNode.next = this.head;
//         }
//     }

//     // Function to move to the next image in the slideshow
//     nextImage() {
//         if (this.current) {
//             this.current = this.current.next;
//             return this.current;
//         }
//         return null;
//     }
// }

// // Create a slideshow with images
// const slideshow = new Slideshow();
// slideshow.insert(1, 'image1.jpg');
// slideshow.insert(2, 'image2.jpg');
// slideshow.insert(3, 'image3.jpg');
// // Add more images as needed

// // Function to display the current image
// function displayCurrentImage() {
//     if (slideshow.current) {
//         console.log(`Displaying Image ${slideshow.current.data}: ${slideshow.current.imageUrl}`);
//     }
// }

// // Example: Clicking the "Next" button
// // Display the initial image
// displayCurrentImage();

// // Click the "Next" button
// slideshow.nextImage();
// // Display the next image
// displayCurrentImage();

// // Click the "Next" button again (circular behavior)
// slideshow.nextImage();
// // Display the next image or go back to the first one if it reaches the end
// displayCurrentImage();

// // Click the "Next" button again (circular behavior)
// slideshow.nextImage();
// // Display the next image or go back to the first one if it reaches the end
// displayCurrentImage();

// // Click the "Next" button again (circular behavior)
// slideshow.nextImage();
// // Display the next image or go back to the first one if it reaches the end
// displayCurrentImage();

// // Click the "Next" button again (circular behavior)
// slideshow.nextImage();
// // Display the next image or go back to the first one if it reaches the end
// displayCurrentImage();

// // Click the "Next" button again (circular behavior)
// slideshow.nextImage();
// // Display the next image or go back to the first one if it reaches the end
// displayCurrentImage();

