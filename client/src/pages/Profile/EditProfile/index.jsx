import React from "react";
import { useSelector } from "react-redux";

function EditProfile() {
  const user = useSelector((s) => s.auth.currentUser);
  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="mx-10 my-5 sm:px-0">
            <img
              className="w-[30rem] h-[30rem] mx-auto object-cover rounded-full items-center"
              src={
                user?.avatar ||
                "https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg"
              }
              alt="Rounded avatar"
            />
            <div className="text-center my-8 font-bold text-2xl">
              {user?.name}
            </div>
            <label
              className="block mb-2 text-center text-lg font-medium text-gray-900 dark:text-gray-300"
              for="file_input"
            >
              Đổi ảnh đại diện
            </label>
            <input
              className="block w-1/2 mx-auto text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
        </div>
        <div className="mt-5 md:col-span-2 flex flex-col justify-center md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="first-name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="off"
                      defaultValue={user?.name}
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="last-name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autocomplete="off"
                      defaultValue={user?.dob}
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Giới tính
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="off"
                      defaultValue={user?.gender}
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="off"
                      defaultValue={user?.email}
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="off"
                      defaultValue={user?.phone}
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Địa chỉ
                    </label>
                    <input
                      disabled
                      type="text"
                      name="email-address"
                      defaultValue={user?.address}
                      id="email-address"
                      autocomplete="off"
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
