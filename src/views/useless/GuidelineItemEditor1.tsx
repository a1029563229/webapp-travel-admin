import { Button, Card, Select, Input, Table, Upload, Form } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import ImgUploader from "@/components/img-uploader";
import { ApiGetShopList } from "@/api";
import { v4 as uuid } from "uuid";

const { Option } = Select;
const { TextArea } = Input;
const { Column } = Table;

type GuidelineItem = {
  type: number;
  rowKey: string;
  content?: string;
  shop_id?: number;
  images?: number;
  url?: string;
}

const guidelineItemTpl = {
  type: 1,
}

const guidelineItemList: GuidelineItem[] = [
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
          <Select style={{ width: 120 }} placeholder="请选择店铺">
            {shopList.map((item: any) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="guideline-shop-item">
        <Form.Item name={[index, 'images']}>
          <Input placeholder="展示图片数量" />
        </Form.Item>
      </div>
    </section>
  )
}

const GuidelineItemEditor = (props: any) => {
  const [items, setItems] = useState(guidelineItemList);
  const [form] = useForm();

  const addItem = () => {
    setItems([...items, { ...guidelineItemTpl, rowKey: uuid() }]);
  }

  const deleteItem = (index: number) => {
    const values = form.getFieldsValue();
    console.log(values);
    // items.splice(index, 1);
    // setItems([...items]);
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
    const outputValues = items.map((item, i) => ({ ...item, ...values[i] }));
    console.log(outputValues);
    props.onChange && props.onChange(outputValues);
  }

  return (
    <Card
      title="攻略项目编辑器"
      bordered={false}
      extra={<Button type="link" onClick={() => addItem()}>新增项目</Button>}>
      <Form className="project-form" form={form} onValuesChange={onValuesChange}>
        <Table
          dataSource={items}
          rowKey={(r) => r.rowKey}
        >
          <Column title="项目类型" dataIndex="type" render={(type, record, index) =>
            <Select value={type} style={{ width: 120 }} onChange={(v) => setType(index, v)}>
              <Option value={1}>文本</Option>
              <Option value={2}>店铺</Option>
              <Option value={3}>图片</Option>
            </Select>
          }></Column>
          <Column title="项目内容" dataIndex="content" render={(content, record: GuidelineItem, index) =>
            <>
              {
                record.type === 1
                  ? <Form.Item name={[index, 'content']}>
                    <TextArea placeholder="请输入项目内容" style={{ width: 400 }} />
                  </Form.Item>
                  : record.type === 2
                    ? <GuidelineShop index={index} />
                    : <Form.Item name={[index, 'url']}>
                      <ImgUploader max={1} />
                    </Form.Item>
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
      </Form>
    </Card>
  )
}

export default GuidelineItemEditor;