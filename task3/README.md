Clone dự án

bash
git clone <your-repo-url>
cd <project-folder>
Cài đặt dependencies

bash
npm install
# hoặc
yarn install
Chạy dự án

bash
npm run dev
# hoặc
yarn dev
Mở trình duyệt và truy cập http://localhost:5173



Async Actions
fetchPosts: Lấy danh sách bài viết với phân trang

addPost: Thêm bài viết mới

Reducers
setPage: Thay đổi trang hiện tại

setLimit: Thay đổi số lượng bài viết mỗi trang

 Kiến thức áp dụng
Redux Toolkit: createSlice, createAsyncThunk

TypeScript: Generic types, type inference

React Hooks: useState, useEffect, useCallback

REST API: Fetch API, error handling

 Lưu ý
JSONPlaceholder là mock API, dữ liệu sẽ không thực sự được lưu

Các thao tác POST chỉ mô phỏng, không thay đổi dữ liệu thật