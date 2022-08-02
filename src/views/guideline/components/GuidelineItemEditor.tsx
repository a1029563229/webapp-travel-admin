import { Button, Card, Select, Input, Table, Upload, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./GuidelineItemEditor.less";
import { useForm } from "antd/lib/form/Form";

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
  return (
    <section className="guideline-shop-container">
      <div className="guideline-shop-item"><Select style={{ width: 120 }} placeholder="请选择店铺" /></div>
      <div className="guideline-shop-item"><Input placeholder="展示图片数量" /></div>
    </section>
  )
}

const GuidelineItemEditor = () => {
  const form = useForm();
  const [items, setItems] = useState(guidelineItemList);

  const addItem = () => {
    setItems([...items, guidelineItemTpl]);
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
  }

  return (
    <Card
      title="攻略项目编辑器"
      bordered={false}
      extra={<Button type="link" onClick={() => addItem()}>新增项目</Button>}>
      <Form form={form}>
        
      </Form>
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
        <Column title="项目内容" dataIndex="content" render={(content, record: GuidelineItem) =>
          <>
            {
              record.type === 1
                ? <TextArea placeholder="请输入项目内容" style={{ width: 400 }} />
                : record.type === 2
                  ? <GuidelineShop />
                  : <Upload
                    listType="picture-card"
                    showUploadList={false}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上传图片</div>
                    </div>
                  </Upload>
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
    </Card>
  )
}

export default GuidelineItemEditor;