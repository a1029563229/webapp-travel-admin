import { Upload, UploadFile } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { baseURL } from "@/service";

const ImgUploader = ({
  multiple = false,
  max = 9,
  onChange = (v: any) => { }
}) => {
  const [loading, setLoading] = useState(false);
  const UploadButton = () => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeHandler = (e: any) => {
    const { fileList: newFileList } = e;
    setFileList(newFileList);

    if (!newFileList.every((item: any) => item.status === 'done')) return;
    const imgList = newFileList.map((item: any) => item.response.data);
    onChange && onChange(max === 1 ? imgList[0] : imgList);
  }

  return (
    <Upload
      listType="picture-card"
      action={`${baseURL}/common/upload`}
      multiple={multiple}
      fileList={fileList}
      onChange={onChangeHandler}
    >
      {fileList.length >= max ? null : <UploadButton />}
    </Upload>
  )
}

export default ImgUploader;