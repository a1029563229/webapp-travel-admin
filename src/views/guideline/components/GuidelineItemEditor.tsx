import { Button, Card, Select, Input, Table, Upload, Form } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import "./GuidelineItemEditor.less";
import ImgUploader from "@/components/img-uploader";
import { ApiGetShopList } from "@/api";

const { Option } = Select;
const { TextArea } = Input;
const { Column } = Table;

type GuidelineItem = {
  type: number;
  content: string;
}

const guidelineItemTpl = {
  type: 1,
  content: ''
}

const guidelineItemList: GuidelineItem[] = [
  {
    type: 1,
    content: ''
  }
];

const GuidelineShop = () => {
  const [shopList, setShopList] = useState([]);
  useEffect(async () => {
    const reply = await ApiGetShopList({ 
      pageIndex: 1, 
      pageSize: 999, 
      city: '深圳' 
    });
    setShopList(reply.data);
    console.log(shopList);
  }, [])

  return (
    <section className="guideline-shop-container">
      <div className="guideline-shop-item">
        <Form.Item name="shop_id">
          <Select style={{ width: 120 }} placeholder="请选择店铺">
            {shopList.map((item: any) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="guideline-shop-item">
        <Form.Item name="images">
          <Input placeholder="展示图片数量" />
        </Form.Item>
      </div>
    </section>
  )
}

const GuidelineItemEditor = () => {
  const [items, setItems] = useState(guidelineItemList);
  const forms = items.map(item => useForm()[0]);

  const addItem = () => {
    setItems([...items, guidelineItemTpl]);
  }

  const deleteItem = (index: number) => {
    const form = forms[index];
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
  }

  return (
    <Card
      title="攻略项目编辑器"
      bordered={false}
      extra={<Button type="link" onClick={() => addItem()}>新增项目</Button>}>
      <Table
        dataSource={items}
      >
        <Column title="项目类型" dataIndex="type" render={(type) =>
          <Select value={type} style={{ width: 120 }}>
            <Option value={1}>文本</Option>
            <Option value={2}>店铺</Option>
            <Option value={3}>图片</Option>
          </Select>
        }></Column>
        <Column title="项目内容" dataIndex="content" render={(content, record: GuidelineItem, index) =>
          <>
            <Form form={forms[index]}>
              {
                record.type === 1
                  ? <Form.Item name="content">
                    <TextArea placeholder="请输入项目内容" style={{ width: 400 }} />
                  </Form.Item>
                  : record.type === 2
                    ? <GuidelineShop />
                    : <Form.Item name="url">
                      <ImgUploader />
                    </Form.Item>
              }
            </Form>
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
    </Card>
  )
}

export default GuidelineItemEditor;