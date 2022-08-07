import { Button, Card, Select, Input, Table, Form, TimePicker } from "antd";
import { useEffect, useState } from "react";
import "./GuidelineItemEditor.less";
import { ApiGetShopList } from "@/api";
import { v4 as uuid } from "uuid";
import ImgUploader from "@/components/img-uploader";

const { Option } = Select;
const { Column } = Table;
const { TextArea } = Input;

export type GuidelineItem = {
  rowKey: string;
  type?: number;
  content?: string;
  shop_id?: number;
  images?: number;
  url?: string;
}

const guidelineRouteList: GuidelineItem[] = [
  {
    rowKey: uuid()
  }
];

const GuidelineContent = (props: any) => {
  const { index, name } = props;

  return (<Form.Item name={[name, index, 'content']} rules={[{ required: true, message: '请输入项目内容' }]}>
    <TextArea placeholder="请输入项目内容" style={{ width: 400 }} />
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
        <Form.Item name={[name, index, 'shop_id']} rules={[{ required: true, message: '请选择店铺' }]}>
          <Select style={{ width: 180 }} placeholder="请选择店铺">
            {shopList.map((item: any) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="guideline-shop-item">
        <Form.Item name={[name, index, 'images']} initialValue={1} rules={[{ required: true, message: '请输入展示图片数量' }]}>
          <Input placeholder="展示图片数量" />
        </Form.Item>
      </div>
    </section>
  )
}

const GuidelineItemEditor = (props: any) => {
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
        title="攻略项目编辑器"
        bordered={false}
        extra={<Button type="link" onClick={() => addItem()}>新增项目</Button>}>
        <section className="project-form">
          <Table
            dataSource={items}
            rowKey={(r) => r.rowKey}
          >
            <Column title="项目类型" dataIndex="type" width={150} render={(type, record, index) =>
              <Form.Item name={[name, index, 'type']} initialValue={1}>
                <Select value={type} style={{ width: 120 }}>
                  <Option value={1}>文本</Option>
                  <Option value={2}>店铺</Option>
                  <Option value={3}>图片</Option>
                </Select>
              </Form.Item>
            }></Column>
            <Column title="项目内容" dataIndex="content" render={(content, record: GuidelineItem, index) =>
              <>
                {
                  value
                    ? value[index].type === 1
                      ? <GuidelineContent name={name} index={index} />
                      : value[index].type === 2
                        ? <GuidelineShop name={name} index={index} />
                        : <Form.Item name={[name, index, 'url']} rules={[{ required: true, message: '请上传图片' }]}>
                          <ImgUploader max={1} />
                        </Form.Item>
                    : <GuidelineContent name={name} index={index} />
                }
              </>
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

  export default GuidelineItemEditor;