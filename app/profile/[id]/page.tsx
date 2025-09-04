import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div>
      <p className="text-4xl">User {params.id}</p>
    </div>
  );
}
