import { Button, Card, Select, Input, Table, Upload, Form, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import "./GuidelineRouteEditor.less";
import { ApiGetShopList } from "@/api";
import moment from "moment";
import { v4 as uuid } from "uuid";

const { Option } = Select;
const { Column } = Table;

type GuidelineRoute = {
  type: number;
  rowKey: string;
  content?: string;
  day?: number;
  start_time?: string;
  time_consuming?: number;
}

const guidelineRouteTpl = {
  type: 1,
}

const guidelineRouteList: GuidelineRoute[] = [
  {
    type: 1,
    rowKey: uuid()
  }
];

const GuidelineShop = (props: any) => {
  const { index } = props;
  const [shopList, setShopList] = useState([]);
  useEffect(() => {
    (async () => {
      const reply: any = await ApiGetShopList({
        pageIndex: 1,
        pageSize: 999,
        city: '深圳'
      });
      setShopList(reply.list);
    })();
  }, [])

  return (
    <section className="guideline-shop-container">
      <div className="guideline-shop-item">
        <Form.Item name={[index, 'shop_id']}>
          <Select style={{ width: 180 }} placeholder="请选择店铺">
            {shopList.map((item: any) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </section>
  )
}

const GuidelineRouteEditor = (props: any) => {
  const [items, setItems] = useState(guidelineRouteList);
  const [form] = useForm();

  const addItem = () => {
    setItems([...items, { ...guidelineRouteTpl, rowKey: uuid() }]);
  }

  const deleteItem = (index: number) => {
    items.splice(index, 1);
    setItems([...items]);
  }

  const sortGuidelineItem = (index: number, sort: number) => {
    if (index === 0 && sort === -1) return;
    if (index === items.length - 1 && sort === 1) return;

    items.splice(index + sort, 0, ...items.splice(index, 1));
    setItems([...items]);

    const values = Object.values(form.getFieldsValue());
    values.splice(index + sort, 0, ...values.splice(index, 1));
    form.setFieldsValue(values);
  }

  const setType = (index: number, type: number) => {
    items[index].type = type;
    setItems([...items]);
  }

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    const outputValues = items.map((item, i) => ({
      ...item,
      ...values[i],
      start_time: values[i].start_time ? values[i].start_time.format('HH:mm') : null
    }));
    console.log(outputValues);
    props.onChange && props.onChange(outputValues);
  }

  return (
    <Card
      title="攻略路线编辑器"
      bordered={false}
      extra={<Button type="link" onClick={() => addItem()}>新增项目</Button>}>
      <Form className="project-form" form={form} onValuesChange={onValuesChange}>
        <Table
          dataSource={items}
          rowKey={(r) => r.rowKey}
        >
          <Column title="路线类型" dataIndex="type" width={150} render={(type, record, index) =>
            <Select value={type} style={{ width: 120 }} onChange={(v) => setType(index, v)}>
              <Option value={1}>文本</Option>
              <Option value={2}>店铺</Option>
            </Select>
          }></Column>
          <Column title="天数" dataIndex="day" width={120} render={(content, record: GuidelineRoute, index) =>
            <Form.Item name={[index, 'day']} initialValue="1">
              <Input prefix="第" suffix="天" />
            </Form.Item>
          }></Column>
          <Column title="开始时间" dataIndex="start_time" width={150} render={(content, record: GuidelineRoute, index) =>
            <Form.Item name={[index, 'start_time']} initialValue={moment('10:00', 'HH:mm')}>
              <TimePicker placeholder="开始时间" format="HH:mm" />
            </Form.Item>
          }></Column>
          <Column title="路线内容" dataIndex="content" render={(content, record: GuidelineRoute, index) =>
            <>
              {
                record.type === 1
                  ? <Form.Item name={[index, 'content']} rules={[{ required: true, message: '请输入旅游点' }]}>
                    <Input placeholder="请输入旅游点" />
                  </Form.Item>
                  : <GuidelineShop index={index} />
              }
            </>
          }></Column>
          <Column title="预计用时" dataIndex="time_consuming" width={120} render={(content, record: GuidelineRoute, index) =>
            <Form.Item name={[index, 'time_consuming']} rules={[{ required: true, message: '请输入' }]}>
              <Input suffix="小时" />
            </Form.Item>
          }></Column>
          <Column title="操作" dataIndex="content" render={(content, record, index) =>
            <>
              <Button type="link" onClick={() => sortGuidelineItem(index, -1)}>上移</Button>
              <Button type="link" onClick={() => sortGuidelineItem(index, 1)}>下移</Button>
              <Button type="link" onClick={() => deleteItem(index)}>删除</Button>
            </>
          }></Column>
        </Table>
      </Form>
    </Card>
  )
}

export default GuidelineRouteEditor;