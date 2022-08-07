import { Button, Card, Form, Input, Radio } from "antd";
import { useParams } from "react-router-dom";
import GuidelineItemEditor from "./components/GuidelineItemEditor";
import ImgUploader from "@/components/img-uploader";
import GuidelineRouteEditor, { GuidelineRoute } from "./components/GuidelineRouteEditor";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

const testData = {
  "type": 1,
  "name": "休闲游",
  "author": "晒兜斯",
  "poster": "http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/624d872e557f79640a990cc64dfb482d133a997228ceada3f9e9b96411bfcf98.jpg",
  "city": "成都",
  "day": "3",
  "tag": "好吃",
  "items": [
    {
      "type": 1,
      "content": "首先进入成都"
    },
    {
      "type": 2,
      "images": 1,
      "shop_id": 60
    },
    {
      "type": 3,
      "url": "http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/2d2e0bcf26fcfc76185033efe0326f1db6924b5478a92cbcdc4463449d3fa464.jpg"
    }
  ],
  "routes": [
    {
      "type": 1,
      "day": "1",
      "start_time": "10:00",
      "content": "景点",
      "time_consuming": "1"
    },
    {
      "type": 2,
      "day": "1",
      "start_time": "16:00",
      "shop_id": 62,
      "time_consuming": "1"
    }
  ]
}

const ModifyGuideline = () => {
  const { type } = useParams();
  const [form] = useForm();

  form.setFieldsValue({
    ...testData,
    routes: testData.routes.map((route: any) => ({
      ...route,
      start_time: route.start_time ? moment(route.start_time, 'HH:mm') : null
    }))
  });

  const onFinish = (values: any) => {
    values.routes = values.routes.map((route: GuidelineRoute) => ({
      ...route,
      start_time: route.start_time ? route.start_time.format('HH:mm') : null
    }))
    console.log('Success:', values);
    console.log(JSON.stringify(values, null, 2));
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
        <Form.Item
          name="items"
          wrapperCol={{ span: 24 }}
        >
          <GuidelineItemEditor name="items" form={form} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
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