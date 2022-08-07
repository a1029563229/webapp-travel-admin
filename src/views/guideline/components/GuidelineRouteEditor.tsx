import { Button, Card, Select, Input, Table, Upload, Form, TimePicker } from "antd";
import { useEffect, useState } from "react";
import "./GuidelineRouteEditor.less";
import { ApiGetShopList } from "@/api";
import moment from "moment";
import { v4 as uuid } from "uuid";

const { Option } = Select;
const { Column } = Table;

export type GuidelineRoute = {
  rowKey: string;
  type?: number;
  content?: string;
  day?: number;
  start_time?: any;
  time_consuming?: number;
}

const guidelineRouteList: GuidelineRoute[] = [
  {
    rowKey: uuid()
  }
];

const GuidelineContent = (props: any) => {
  const { index, name } = props;

  return (<Form.Item name={[name, index, 'content']} rules={[{ required: true, message: '请输入旅游点' }]}>
    <Input placeholder="请输入旅游点" />
  </Form.Item>)
}

const GuidelineShop = (props: any) => {
  const { index, name } = props;
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
        <Form.Item name={[name, index, 'shop_id']}>
          <Select style={{ width: 180 }} placeholder="请选择店铺">
            {shopList.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </section>
  )
}

const GuidelineRouteEditor = (props: any) => {
  const { name, form, value } = props;
  const [items, setItems] = useState(value && value.length
    ? value.map((item: any) => ({ ...item, rowKey: uuid() }))
    : guidelineRouteList);

  const addItem = () => {
    setItems([...items, { rowKey: uuid() }]);
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

    const values = Object.values(form.getFieldsValue()[name]);
    values.splice(index + sort, 0, ...values.splice(index, 1));
    form.setFieldsValue(values);
  }

  return (
    <Card
      title="攻略路线编辑器"
      bordered={false}
      extra={<Button type="link" onClick={() => addItem()}>新增项目</Button>}>
      <section className="project-form">
        <Table
          dataSource={items}
          rowKey={(r) => r.rowKey}
        >
          <Column title="路线类型" dataIndex="type" width={150} render={(type, record, index) =>
            <Form.Item name={[name, index, 'type']} initialValue={1}>
              <Select value={type} style={{ width: 120 }}>
                <Option value={1}>文本</Option>
                <Option value={2}>店铺</Option>
              </Select>
            </Form.Item>
          }></Column>
          <Column title="天数" dataIndex="day" width={120} render={(content, record: GuidelineRoute, index) =>
            <Form.Item name={[name, index, 'day']} initialValue="1">
              <Input prefix="第" suffix="天" />
            </Form.Item>
          }></Column>
          <Column title="开始时间" dataIndex="start_time" width={150} render={(content, record: GuidelineRoute, index) =>
            <Form.Item name={[name, index, 'start_time']} initialValue={moment('10:00', 'HH:mm')}>
              <TimePicker placeholder="开始时间" format="HH:mm" />
            </Form.Item>
          }></Column>
          <Column title="路线内容" dataIndex="content" render={(content, record: GuidelineRoute, index) =>
            <>
              {
                value
                  ? value[index].type === 1
                    ? <GuidelineContent name={name} index={index} />
                    : <GuidelineShop name={name} index={index} />
                  : <GuidelineContent name={name} index={index} />
              }
            </>
          }></Column>
          <Column title="预计用时" dataIndex="time_consuming" width={120} render={(content, record: GuidelineRoute, index) =>
            <Form.Item name={[name, index, 'time_consuming']} rules={[{ required: true, message: '请输入' }]}>
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
      </section>
    </Card>
  )
}

export default GuidelineRouteEditor;