import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";

const FieldCard = ({ fieldData }) => {
  console.log(fieldData);
  return (
    <Link href={`/san-bong/${fieldData.id}`}>
      <Card
        className="w-full md:w-[30%]"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://www.sporta.vn/assets/default_venue_1-a42787aefdf8d9e53ffd559a5962172947f2effdfdc1122e6185c5cb0690bd16.jpg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {fieldData.fieldName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {fieldData.address}
        </p>
      </Card>
    </Link>
  );
};

export default FieldCard;
