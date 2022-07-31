import { ApiGetGuidelineList } from "@/api";
import { Button, Card, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import "./list.less";

const { Column } = Table;

interface Guideline {
  name: string;
}

const data: Guideline[] = []

const GuidelineList = () => {
  const [guidelineList, setGuidelineList] = useState(data)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const getGuidelineList = async () => {
    const reply = await ApiGetGuidelineList({ pageIndex: pagination.current, pageSize: pagination.pageSize });
    const data = reply.data;
    setGuidelineList(data.list);
    setPagination({ current: data.pageIndex, pageSize: data.pageSize, total: data.total });
  }

  useEffect(() => {
    getGuidelineList();
  }, [pagination.current])

  const deleteGuideline = async (id: number) => {
    console.log({ id });
  }

  return (
    <Card title="攻略列表" bordered={false}>
      <section className="operation-list">
        <Button type="primary">新增攻略</Button>
      </section>
      <Table
        dataSource={guidelineList}
        pagination={{
          ...pagination,
          onChange: (current) => setPagination({ ...pagination, current })
        }}>
        <Column title="攻略名称" dataIndex="name" key="name"></Column>
        <Column title="城市" dataIndex="city" key="city"></Column>
        <Column title="天数" dataIndex="day" key="day"></Column>
        <Column title="创建时间" dataIndex="created_on" key="created_on"></Column>
        <Column title="操作" dataIndex="id" key="id" render={(id) => (
          <>
            <Button type="link">修改</Button>
            <Popconfirm
              title="确认删除该条攻略吗?"
              onConfirm={() => deleteGuideline(id)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" danger>删除</Button>
            </Popconfirm>
          </>
        )} />
      </Table>
    </Card>
  )
}

export default GuidelineList;