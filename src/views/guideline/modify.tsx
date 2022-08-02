import { Button, Card, Form, Input, Radio, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import GuidelineItemEditor from "./components/GuidelineItemEditor";
import ImgUploader from "@/components/img-uploader";

const ModifyGuideline = () => {
  const { type } = useParams();
  console.log({ type });

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const loading = false;
  const UploadButton = () => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <Card title={type == "add" ? "新增攻略" : "修改攻略"}>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ type: 1 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="攻略类型"
          name="type"
          rules={[{ required: true, message: '请选择攻略类型' }]}
        >
          <Radio.Group>
            <Radio value={1}>休闲游</Radio>
            <Radio value={2}>充实游</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="攻略名称"
          name="name"
          rules={[{ required: true, message: '请输入攻略名称' }]}
        >
          <Input placeholder="请输入攻略名称" />
        </Form.Item>
        <Form.Item
          label="攻略作者"
          name="author"
          rules={[{ required: true, message: '请输入攻略作者' }]}
        >
          <Input placeholder="请输入攻略作者" />
        </Form.Item>
        <Form.Item
          label="攻略封面"
          name="poster"
          rules={[{ required: true, message: '请上传攻略封面' }]}
          valuePropName="fileList"
        >
          <ImgUploader max={1} />
        </Form.Item>
        <Form.Item
          label="攻略城市"
          name="city"
          rules={[{ required: true, message: '请输入攻略城市' }]}
        >
          <Input placeholder="请输入攻略城市" />
        </Form.Item>
        <Form.Item
          label="攻略天数"
          name="day"
          rules={[{ required: true, message: '请输入攻略天数' }]}
        >
          <Input placeholder="请输入攻略天数" />
        </Form.Item>
        <Form.Item
          label="攻略标签"
          name="tag"
          rules={[{ required: true, message: '请输入攻略标签' }]}
        >
          <Input placeholder="请输入攻略标签，以逗号隔开" />
        </Form.Item>
        {/* <Form.Item
          label="攻略项目"
          name="items"
        >
          <GuidelineItemEditor />
        </Form.Item> */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ModifyGuideline;