import { Button, Card, Form, Input, Radio } from "antd";
import { useParams } from "react-router-dom";
import GuidelineItemEditor from "../useless/GuidelineItemEditor1";
import ImgUploader from "@/components/img-uploader";
import GuidelineRouteEditor from "./components/GuidelineRouteEditor";
import { useForm } from "antd/es/form/Form";

const ModifyGuideline = () => {
  const { type } = useParams();
  const [form] = useForm();
  console.log({ type });

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Card title={type == "add" ? "新增攻略" : "修改攻略"}>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ type: 1 }}
        onFinish={onFinish}
      >
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item
          label="攻略项目"
          name="items"
        >
          <GuidelineItemEditor name="items" form={form} />
        </Form.Item>
        <Form.Item
          label="攻略路线"
          name="routes"
        >
          <GuidelineRouteEditor name="routes" form={form} />
        </Form.Item>
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