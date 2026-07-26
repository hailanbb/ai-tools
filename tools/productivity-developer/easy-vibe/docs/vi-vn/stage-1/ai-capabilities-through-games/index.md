# Sơ cấp 1: Thời đại AI, biết nói là biết lập trình

Đây là một bài học **học theo dự án**. Bạn hãy làm theo từng bước và cố gắng tái hiện kết quả.
Đừng lo sai hay sửa. Hãy nhớ:

<div style="text-align: center;">
<div style="display: inline-block; padding: 8px 20px; border-radius: 8px; border: 1px dashed #FFB6C1; background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%); margin: 12px 0;">
  <span style="font-size: 15px; font-weight: 500; color: #666;">Hoàn thành quan trọng hơn hoàn hảo</span>
</div>
</div>

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'khoảng <strong>4 giờ</strong> (có thể chia nhiều lần)'
const relatedArticles =
  relatedArticlesMap['vi-vn/stage-1/ai-capabilities-through-games'] ?? []
</script>

## Dẫn nhập chương

<ChapterIntroduction :duration="duration" :tags="['Lập trình đối thoại', 'Mini game AI-native', 'Thực hành Snake']" coreOutput="Snake AI-native + mini game tự tạo" expectedOutput="1 Snake AI-native chạy được + (tùy chọn) 1 mini game/demo tự tạo">

Nếu bạn <strong>hoàn toàn không biết lập trình</strong> hoặc chỉ biết một chút, chương này dành cho bạn. Ta sẽ bắt đầu từ cơ bản: dùng <strong>đối thoại</strong> để AI giúp bạn viết code. Không cần nhớ cú pháp, không cần cấu hình phức tạp, nhiều trường hợp có thể chạy ngay trên web.

Bạn sẽ tự tay làm ra <strong>chương trình đầu tiên chạy được</strong>: một phiên bản Snake có thể "ăn từ", "viết thơ", "vẽ vẽ". Bạn sẽ cảm nhận lập trình với AI là gì: không phải AI nghĩ thay bạn, mà bạn nói rõ ý muốn, AI giúp bạn hiện thực.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Khởi động', description: 'Thời đại AI: biết nói là biết lập trình' },
      { title: 'Khám phá nhanh', description: 'Trải nghiệm 60 giây' },
      { title: 'Thực hành AI-native', description: 'Xây Snake AI-native' },
      { title: 'Mở rộng sáng tạo', description: 'Tự làm một game khác' }
    ]" />
  </ClientOnly>
</div>

## 1. Khó khăn của người bình thường và cơ hội mới

Rất nhiều người có ý tưởng sản phẩm: công cụ ghi chép chi tiêu, một trang web ghi lại quá trình lớn lên của con, hoặc một mini game. Nhưng chỉ cần nghĩ tới "viết code" và "tìm lập trình viên" là thấy mệt.

AI tạo ra một khả năng mới: bạn không nhất thiết phải biết code ngay lập tức; bạn cần học cách nói rõ ràng với AI về điều bạn muốn. Kể cả với lập trình viên chuyên nghiệp, AI đang dần trở thành một phần của quy trình làm việc. Với người mới, khả năng "giao tiếp đúng với agent" là cực kỳ có giá trị.

Mục tiêu của bài học là giúp bạn hình thành kỹ năng mới: <strong>dùng ngôn ngữ tự nhiên để làm ứng dụng</strong>. Bạn sẽ học cách mô tả mục tiêu, chia bước, xác định đầu vào/đầu ra, và sửa lỗi khi kết quả chưa đúng ý.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Khó khăn và cơ hội', description: 'Một cách mới để tạo sản phẩm' },
      { title: 'Khám phá nhanh', description: 'Trải nghiệm 60 giây' },
      { title: 'Thực hành AI-native', description: 'Xây Snake AI-native' },
      { title: 'Mở rộng sáng tạo', description: 'Tự làm một game khác' }
    ]" />
  </ClientOnly>
</div>

## 2. AI có thể làm được tới mức nào hiện nay

Câu hỏi cụ thể: nếu bạn không biết viết code, bạn có thể làm được tới mức nào với AI đối thoại?

Thực tế, hiện nay AI rất hợp để:

- công cụ nội bộ nhỏ,
- bảng điều khiển/trực quan dữ liệu,
- mini game nhẹ,
- prototype để kiểm chứng ý tưởng từ góc nhìn sản phẩm.

Với sản phẩm lớn và đưa vào sản xuất, vẫn cần con người đầu tư vào thiết kế luồng, chi tiết, bảo mật, hiệu năng và khả năng bảo trì. Nhưng đối với prototype và công cụ tự dùng, chất lượng đã rất thực dụng.

### 2.1 Làm Snake trong 60 giây (với z.ai)

Mở trang web thực hành của khóa học: [z.ai](https://chat.z.ai/). Trong bài này, ta dùng chế độ "phát triển full-stack" để xem AI tạo dự án và xem trước kết quả.

::: details Lập trình ngay trên web là gì?

Trước đây, làm một app web thường cần:

- cài môi trường (Node.js, Python),
- cấu hình editor,
- học HTML/CSS/JavaScript,
- xử lý dependency và lỗi.

Giờ đây, với nền tảng lập trình AI:

- mở trình duyệt,
- mô tả tính năng bằng ngôn ngữ tự nhiên,
- AI tự động sinh code và xem trước.

Nó chuyển trọng tâm từ "viết cú pháp" sang "mô tả yêu cầu".

:::

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-25-03.png)

Đánh yêu cầu đơn giản như sau và chạy:

```txt
Làm giúp tôi game Snake:
1. Điều khiển bằng phím mũi tên
2. Ăn thức ăn thì dài ra và tăng điểm
3. Chạm tường hoặc chạm thân thì Game Over
4. Có nút bắt đầu và chơi lại
5. Giao diện gọn và đẹp
```

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-34-03.png)

Khi xong, bạn sẽ thấy trang web ở bên phải. Thường bạn có thể:

- cuộn để xem,
- vào full-screen,
- tải dự án,
- xem code.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-35-11.png)

Để xem mã nguồn, bấm vào biểu tượng code ở góc trên bên phải.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image7.png)

::: tip Thử thêm công cụ khác

Ngoài z.ai, bạn có thể thử nhiều công cụ khác. Điều quan trọng không phải tên công cụ, mà là vòng lặp:

1. mô tả yêu cầu,
2. thử chạy,
3. chỉ rõ hiện tượng sai,
4. yêu cầu sửa cụ thể,
5. lặp lại.

:::

### 2.2 Lập trình đối thoại làm được gì và không làm được gì

Tóm tắt thực dụng:

- AI rất giỏi với bài toán "nhỏ và rõ ràng" nếu bạn mô tả UI và tương tác cụ thể.
- Với dự án lớn, bạn cần góc nhìn theo quy trình: chia thành bước, định nghĩa input/output và giao cho AI làm từng phần.
- "Viết được" không đồng nghĩa "dùng được cho người thật". Sản xuất cần test, bảo mật và review.

::: warning Hướng dẫn theo tình huống

- **Prototype / demo / công cụ nội bộ**: rất hợp để AI làm bản đầu, bạn iter tiếp.
- **Sản phẩm lớn cho người dùng thật**: cần đầu tư dài hạn về kỹ thuật.
- **Hệ thống yêu cầu bảo mật/tuân thủ cao (thanh toán, y tế, rủi ro)**: không nên "sinh xong là deploy", phải có quy trình kiểm tra nghiêm ngặt.

:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Khó khăn và cơ hội', description: 'Một cách mới để tạo sản phẩm' },
      { title: 'Khám phá nhanh', description: 'Trải nghiệm 60 giây' },
      { title: 'Thực hành AI-native', description: 'Xây Snake AI-native' },
      { title: 'Mở rộng sáng tạo', description: 'Tự làm một game khác' }
    ]" />
  </ClientOnly>
</div>

## 3. Thực hành: làm một Snake "AI-native"

"AI-native" ở đây nghĩa là: game không chỉ là Snake cơ bản, mà có thêm một khả năng AI gắn vào gameplay. Ví dụ:

- ăn một từ thì dịch và tạo ví dụ câu,
- ăn một chủ đề thì sinh ra một câu/nội dung ngắn,
- ăn một prompt thì sinh ra một hình.

Quan trọng nhất là tập quy trình: mô tả rõ -> để AI làm -> thử chạy -> sửa theo kết quả.

> Mẹo khi yêu cầu sửa:
>
> 1. mô tả hiện tượng quan sát được,
> 2. nói rõ hành vi kỳ vọng,
> 3. nếu có lỗi, copy đầy đủ log/stack,
> 4. yêu cầu sửa tối thiểu cần thiết.

Để theo dõi trình tự thực hành, bạn sẽ thấy các ảnh minh họa:

> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image12.png)
>
>    ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image13.png)
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image14.png)

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image15.png)

Khi gặp lỗi, đừng đoán. Hãy copy lỗi và yêu cầu AI giải thích bằng ngôn ngữ đơn giản, sau đó đưa ra sửa đổi cụ thể.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image56.png)
![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image57.png)
![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image58.png)

## 4. Mở rộng: tự làm một mini game của riêng bạn

Khi Snake đã chạy, mục tiêu không phải nhớ hết code, mà là tạo biến thể.

Gợi ý:

- game phản xạ (bấm đúng thời điểm),
- quiz từ vựng,
- đồng hồ đếm ngược với phần thưởng,
- tạo thẻ (card) với điểm số.

Bước quan trọng: định nghĩa vòng lặp của game (input -> state -> output) rồi mới nhờ AI implement.

![1767350588191](../../../zh-cn/stage-1/ai-capabilities-through-games/images/1767350588191.png)

## Bài tập

1. Làm lại Snake cơ bản với màu sắc và UI của bạn.
2. Thêm ít nhất 1 khả năng AI (dịch, tóm tắt, sinh text...).
3. Tự tạo một mini game/demo đơn giản nhưng chơi được.

## Bước tiếp theo

Ở các chương tiếp theo, ta sẽ kết nối các năng lực AI cụ thể hơn (text-to-text, image-to-text, text-to-image) và tiến tới các dự án đầy đủ hơn.

<RelatedArticles :articles="relatedArticles" />
---
title: 'Sơ cấp 1: Thời đại AI, nói là lập trình'
description: 'Làm game rắn AI-native bằng đối thoại, sau đó áp dụng workflow để tạo mini game hoặc demo của riêng bạn.'
---
