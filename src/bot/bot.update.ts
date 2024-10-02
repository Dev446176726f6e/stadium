import { log } from "console";
import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply("Bot ishga tushdi.!");
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    console.log(ctx);

    if ("text" in ctx.message) {
      if (ctx.message.text == "salom") {
        await ctx.replyWithHTML("<b> Hello </b>");
      } else {
        await ctx.replyWithHTML(ctx.message.text);
      }
    }
  }

  @On("photo")
  async onPhoto(@Ctx() ctx: Context) {
    if ("photo" in ctx.message) {
      console.log(ctx.message.photo);
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
      );
    }
  }

  @On("video")
  async onVideo(@Ctx() ctx: Context) {
    if ("video" in ctx.message) {
      console.log(ctx.message.video);
      await ctx.reply(String(ctx.message.video.file_size));
    }
  }

  @On("sticker")
  async onSticket(@Ctx() ctx: Context) {
    if ("sticker" in ctx.message) {
      console.log(ctx.message.sticker);

      await ctx.reply("😌");
    }
  }

  @On("animation")
  async onAnimation(@Ctx() ctx: Context) {
    if ("animation" in ctx.message) {
      console.log(ctx.message.animation);

      await ctx.reply("😌");
    }
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    if ("contact" in ctx.message) {
      console.log(ctx.message.contact);
      console.log(ctx.message.contact.last_name);
    }
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    if ("location" in ctx.message) {
      console.log(ctx.message.location);

      await ctx.reply(String(ctx.message.location.latitude));
      await ctx.reply(String(ctx.message.location.longitude));
      await ctx.replyWithLocation(
        ctx.message.location.latitude,
        ctx.message.location.longitude,
      );
    }
  }

  @On("voice")
  async onVoice(@Ctx() ctx: Context) {
    if ("voice" in ctx.message) {
      console.log(ctx.message.voice);

      await ctx.reply(String(ctx.message.voice.duration));
    }
  }

  @On("document")
  async onDocument(@Ctx() ctx: Context) {
    if ("document" in ctx.message) {
      console.log(ctx.message.document);

      await ctx.reply(String(ctx.message.document.file_size));
      await ctx.reply(String(ctx.message.document.file_id));
      await ctx.reply(String(ctx.message.document.file_name));
    }
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat.id);
    console.log(ctx.from);
    console.log(ctx.from.first_name);
  }
}
